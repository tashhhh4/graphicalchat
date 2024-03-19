from django.shortcuts import render

# temp: test
from pathlib import Path

def mainAppView(request):

    # temp: test
    print("Inside gcmain Main App View")

    print("Path concatenation Examples...")

    print(Path("a") / Path("b") / Path("c/"))

    return render(request, 'index.html')