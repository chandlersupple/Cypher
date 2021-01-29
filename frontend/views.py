# Libraries
from django.shortcuts import render
from backend.views import *
from backend.models import Question
import keyboard
from django.views.decorators.csrf import csrf_exempt

# Load "index.html"
@csrf_exempt
def index(request):
    try:
        keyboard.unhook_all_hotkeys()
    
    except:
        pass
    
    keyboard.add_hotkey("ctrl+shift+k", onShortcut)
    return render(request, "frontend/index.html")