from django.shortcuts import render, redirect
from django.http import Http404
from .models import Article

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        raise Http404

def create_post(request):
    # 1. Проверяем, авторизован ли пользователь
    if request.user.is_anonymous:
        raise Http404
        
    # 2. Если пользователь отправил форму (метод POST)
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        text = request.POST.get("text", "").strip()
        form = {'title': title, 'text': text}
        
        # 3. Проверяем, что поля не пустые
        if not title or not text:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'create_post.html', {'form': form})
            
        # 4. Проверяем уникальность названия статьи
        if Article.objects.filter(title=title).exists():
            form['errors'] = "Статья с таким названием уже существует"
            return render(request, 'create_post.html', {'form': form})
            
        # 5. Создаем статью и переходим на её страницу
        article = Article.objects.create(title=title, text=text, author=request.user)
        return redirect('get_article', article_id=article.id)
        
    # 6. Если это просто заход на страницу (метод GET) — показываем пустую форму
    return render(request, 'create_post.html', {})