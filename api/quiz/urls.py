from django.urls import path, include
from .api import QuizApiView, AddQuizData,QuizUserData
from .views import index, addQuiz, indexChoice, indexQuestion,addChoice,addQuestion,addChoiceToTable, addQuestionToTable, addQuizToTable, deleteChoice, deleteQustions, deleteQuiz, viewChoice, viewQuestion, viewQuiz, editViewChoice, editViewQuestions, editViewQuiz, editChoice, editQuestions, editQuiz, accomplishments

urlpatterns = [
    path('/api',QuizApiView.as_view()),
    path('/api/quizdata',AddQuizData.as_view()),
    path('/api/viewquizdata',QuizUserData.as_view()),

    #Admin
    path('', index, name="quizview"),
    path('/choice', indexChoice, name="choice"),
    path('/questions', indexQuestion, name="questions"),
    path('/addQuiz', addQuiz, name="addQuiz"),
    path('/addChoice', addChoice, name="addChoice"),
    path('/addQuestion', addQuestion, name="addQuestion"),
    path('/addChoiceToTable', addChoiceToTable, name="addChoiceToTable"),
    path('/addQuestionToTable', addQuestionToTable, name="addQuestionToTable"),
    path('/addQuizToTable', addQuizToTable, name="addQuizToTable"),
	path('/<int:pk>/deleteQuiz/',deleteQuiz ,name='deleteQuiz'), 
	path('/<int:pk>/deleteQuestions/',deleteQustions ,name='deleteQuestions'), 
	path('/<int:pk>/deleteChoice/',deleteChoice ,name='deleteChoice'), 
	path('/<int:pk>/viewQuiz/',viewQuiz ,name='viewQuiz'), 
	path('/<int:pk>/viewQuestions/',viewQuestion ,name='viewQuestions'), 
	path('/<int:pk>/viewChoice/',viewChoice ,name='viewChoice'), 
	path('/<int:pk>/editChoice/',editViewChoice ,name='editChoice'), 
	path('/<int:pk>/editQuiz/',editViewQuiz ,name='editQuiz'), 
	path('/<int:pk>/editQuestions/',editViewQuestions ,name='editQuestions'), 
    path('/editChoice',editChoice ,name='editChangeChoice'), 
	path('/editQuestions',editQuestions ,name='editChangeQuestions'), 
	path('/editQuiz',editQuiz ,name='editChangeQuiz'), 
	path('/accomplishments',accomplishments ,name='accomplishments'), 
]
