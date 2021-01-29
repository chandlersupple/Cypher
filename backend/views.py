from django.shortcuts import render
from django.http import HttpResponse
from .models import Question
from django.http import JsonResponse
import enchant
import json
import keyboard
import pyautogui as pya
import pyperclip
import requests
import string
import threading
import time
import webbrowser
from django.core import serializers
from django.shortcuts import redirect

global commonURL
commonURL = "#"

def onShortcut():
    # Copy the highlighted text
    pya.hotkey("ctrl", "c")
    time.sleep(0.01)
    shortcutInput = pyperclip.paste()

    # Splits input into space separated strings and removes punctuation
    broken = shortcutInput.split(" ")

    for itemCounter, item in enumerate(broken):
        itemList = list(item)
        removedCharacters = 0

        for characterCounter, character in enumerate(item):
            if character in string.punctuation:
                itemList.pop(characterCounter - removedCharacters)
                removedCharacters += 1

        broken[itemCounter] = "".join(itemList)
        
    # Finds valid words and appends to "searchParameters"
    isWord = enchant.Dict("en_US")
    searchParameters = []

    for itemCounter, item in enumerate(broken):
        if len(item) > 0 and isWord.check(item):
            searchParameters.append(item)

    # Format URL and get response
    
    url = "https://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&sort=activity&key=Cy5jzOsUKfZPTP220e0OSw((&q=" + "%20".join(searchParameters) + "&site=stackoverflow"
    global commonURL
    commonURL = "https://stackoverflow.com/search?q=" + "+".join(searchParameters)
    response = requests.get(url).json()

    try:
        Question.objects.all().delete()

    except:
        pass

    for question in response["items"]:
        Question.objects.create(error=shortcutInput, title=question["title"], link=question["link"])

def getQuestions(request):
    global url
    if request.is_ajax and request.method == "GET":
        serialized = serializers.serialize("json", list(Question.objects.all()))
        return JsonResponse({"result":serialized, "url": commonURL})
