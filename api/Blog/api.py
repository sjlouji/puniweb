from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializer import AddBlogSerializer,  BlogSerializer
from .models import Post

class AddBlog(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AddBlogSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        return Response({
            "post": AddBlogSerializer(post, context=self.get_serializer_context()).data,
        })


class ViewBlog(generics.ListCreateAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = Post.objects.all()
    serializer_class = BlogSerializer
    def list(self, request):
        queryset = self.get_queryset()
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)


class BlogUpdataApi(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    lookup_field = 'id'
    serializer_class = BlogSerializer

    def get_queryset(self):
        uid = self.kwargs['id']
        return Post.objects.filter(id=uid)
