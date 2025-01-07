from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.models import Restaurant
from backend.serializer import RestaurantSerializer
import joblib
import sklearn
from sklearn.preprocessing import FunctionTransformer
import google.generativeai as genai

api_key = 'AIzaSyAlZiuoAyHrDLdBtvgFTiLa8IdPHs3iXDw'
def preprocess_text(text):
    text = text.lower()
    return text

def preprocess_texts(texts):
    return [preprocess_text(t) for t in texts]

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash-8b")  

def provide_feedback(reviews):
    prompt = '''
Based on the following reviews on a specific restaurant, I need you to write me a short summary of 200 words maximum summarizing the main points regarding the reviews, including the general sentiment. Note that the reviews might be in different languages, including Darija Arabic. Please do not generate anything except for the short summary.
Here are the reviews:
'''
    prompt = prompt + '\n'.join(reviews)
    return model.generate_content(prompt).text

def provide_recommendation(reviews):
    prompt = '''
Based on the following reviews of a restaurant, write a short paragraph (max 120 words) summarizing the general sentiment and offering suggestions for Yassir on whether to include the restaurant. Note that the restaurant is not yet on Yassir and the reviews are not related to Yassir. Yassir is a platform that allows delievry from restaurants to clients, and it is very selective in terms of the restaurants to work with based on obvious criteria related to providing best user experience while minizming costs and maximizing profit. The reviews may include different languages, including Darija Arabic. Only provide the paragraph with no extra text.
'''
    prompt = prompt + '\n'.join(reviews)
    return model.generate_content(prompt).text

def calculate_score(predictions):
    if not predictions:  
        return 0  
    return sum(predictions) / len(predictions)


try:
    model_pipeline = joblib.load('backend/svm.pkl')
except Exception as e:
    print(f"Erreur lors du chargement du modèle : {e}")
    model_pipeline = None

class RestaurantView(APIView):
    def get(self, request):
        queryset = Restaurant.objects.all()
        serializer_class = RestaurantSerializer
        return Response(serializer_class(queryset, many=True).data)

    def post(self, request):
        id = request.data.get('id')
        if not id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            restaurant = Restaurant.objects.get(id=id)
            serializer = RestaurantSerializer(restaurant)
            comments = restaurant.comments.all()
            ratings = [comment.rating for comment in comments]
            texts = [comment.text for comment in comments]
            
            if ratings:  
                average_rating = sum(ratings) / len(ratings)
                score = round((average_rating / 5) * 100, 2)  
                
                # Si vous voulez utiliser le modèle pour prédire
                if model_pipeline and texts:
                    try:
                        predictions = model_pipeline.predict(texts)
                        # Utilisez les prédictions comme nécessaire
                        score = calculate_score(predictions)
                        print(f"Score : {score}")
                    except Exception as e:
                        print(f"Erreur lors de la prédiction : {e}")
            else:
                score = 0  

                
            response_data = serializer.data
            if(texts):
                feedback = provide_feedback(preprocess_texts(texts))
                recomendation = provide_recommendation(preprocess_texts(texts))
                response_data['recomendation'] = recomendation
                response_data['feedback'] = feedback
            response_data['score'] = score
            print(predictions)
            print(type(predictions))
            response_data['predictions'] = predictions.tolist() 
            response_data['texts'] = texts
            return Response(response_data)

        except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)