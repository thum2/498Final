import time
from datetime import datetime
import sys
from urllib.request import Request, urlopen
from urllib import parse
import requests
import json
import csv
from bs4 import BeautifulSoup, Tag, NavigableString

current_date = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
apiurl = "http://default-environment.m3xdmn2qe3.us-east-2.elasticbeanstalk.com/api/pets/"
apireq = requests.get(apiurl)
apiarray = json.loads(apireq.content)['data']
ExistedURL = []
for apidata in apiarray:
    ExistedURL.append(apidata['original_website'])
    
def postToDatabase(postData):
    postheaders = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    req =  requests.post(apiurl, data=json.dumps(postData), headers=postheaders)
    print(req)





fidoindexURL = "https://www.fidofinder.com/found-dogs.php#!colors=all&size=all&listed=60&gender=all&breed=all&date=&groupid=0"
time.sleep(5)
indexreq = Request(fidoindexURL,headers={'User-Agent': 'Mozilla/5.0'})
indexhandle=urlopen(indexreq)
indexcontent=indexhandle.read()
indexhandle.close()
index_html = BeautifulSoup(indexcontent, "html.parser")
for hit in index_html.findAll("div",{ "class" : "profilebox " }):
    for hit2 in hit.findAll("a"):
        # sleep for 3 sec for polite
        specific_url = "https://www.fidofinder.com"+hit2["href"]
        print(specific_url)
        if specific_url in ExistedURL:
            print("already existed")
            continue
        time.sleep(5)
        tempData = {}
        tempData['comments'] = []
        tempData['notes'] = None
        tempData['userid'] = None
        tempData['name'] = None
        tempData['type'] = "dog"
        tempData['found'] = True
        tempData['breed'] = None
        tempData['color'] = None
        tempData['size'] = None
        tempData['gender'] = None
        tempData['date']=current_date
        tempData['original_website'] = specific_url
        specireq = Request(specific_url,headers={'User-Agent': 'Mozilla/5.0'})
        specihandle=urlopen(specireq)
        specicontent=specihandle.read()
        specihandle.close()
        speci_html = BeautifulSoup(specicontent, "html.parser")
        tempData['img_url'] ="https://www.fidofinder.com"+speci_html.find('img',{"id":"profileimage"})['src']
        for ahit in speci_html.findAll("div",{ "class" : "col" }):
            flag = True
            for ahit2 in ahit.findAll("h3"):
                if flag:
                    for ahit3 in ahit2.findAll("span",{"class":"description"}):
                        blah = []
                        kk = ""
                        for a in ahit3.childGenerator():
                            if isinstance(a,Tag) and a.name == 'br':
                                blah.append(kk)
                                kk = ""
                            else:
                                if isinstance(a,NavigableString):
                                    kk = kk + str(a)
                        if (" (" in kk) and (" ) " in kk):
                            tempData['description'] = "\n".join(blah)
                            tempData['location'] = kk
                        else:
                            blah.append(kk)
                            tempData['description'] = "\n".join(blah)
                            tempData['location'] = str(speci_html.find('a',{'href':"javascript:showmap();"}).previousSibling)+")"
                        flag = False
                if ahit2.text.startswith("Found on"):
                    tempData['datefound'] = (ahit2.text)[9:-1]
        postToDatabase(tempData)


tabyindexURL = "https://www.tabbytracker.com/found-cats.php"
time.sleep(5)
indexreq = Request(tabyindexURL,headers={'User-Agent': 'Mozilla/5.0'})
indexhandle=urlopen(indexreq)
indexcontent=indexhandle.read()
indexhandle.close()
index_html = BeautifulSoup(indexcontent, "html.parser")
for hit in index_html.findAll("div",{ "class" : "profilebox " }):
    for hit2 in hit.findAll("a"):
        # sleep for 3 sec for polite
        specific_url = "https://www.tabbytracker.com"+hit2["href"]
        print(specific_url)
        if specific_url in ExistedURL:
            print("already existed")
            continue
        time.sleep(5)
        tempData = {}
        tempData['comments'] = []
        tempData['notes'] = None
        tempData['userid'] = None
        tempData['name'] = None
        tempData['type'] = "cat"
        tempData['found'] = True
        tempData['breed'] = None
        tempData['color'] = None
        tempData['size'] = None
        tempData['gender'] = None
        tempData['date']=current_date
        tempData['original_website'] = specific_url
        specireq = Request(specific_url,headers={'User-Agent': 'Mozilla/5.0'})
        specihandle=urlopen(specireq)
        specicontent=specihandle.read()
        specihandle.close()
        speci_html = BeautifulSoup(specicontent, "html.parser")
        tempData['img_url'] ="https://www.tabbytracker.com"+speci_html.find('img',{"id":"profileimage"})['src']
        for ahit in speci_html.findAll("div",{ "class" : "col" }):
            flag = True
            for ahit2 in ahit.findAll("h3"):
                if flag:
                    for ahit3 in ahit2.findAll("span",{"class":"description"}):
                        blah = []
                        kk = ""
                        for a in ahit3.childGenerator():
                            if isinstance(a,Tag) and a.name == 'br':
                                blah.append(kk)
                                kk = ""
                            else:
                                if isinstance(a,NavigableString):
                                    kk = kk + str(a)
                        if (" (" in kk) and (" ) " in kk):
                            tempData['description'] = "\n".join(blah)
                            tempData['location'] = kk
                        else:
                            blah.append(kk)
                            tempData['description'] = "\n".join(blah)
                            tempData['location'] = str(speci_html.find('a',{'href':"javascript:showmap();"}).previousSibling)+")"
                        flag = False
                if ahit2.text.startswith("Found on"):
                    tempData['datefound'] = (ahit2.text)[9:-1]
        postToDatabase(tempData)


pawboosturls = ["https://www.pawboost.com/lost-found-pets/index?LfdbFeedStatusForm%5BattributeSearch%5D=&LfdbFeedStatusForm%5Bstatus%5D%5B0%5D=100&LfdbFeedStatusForm%5Bstatus%5D%5B1%5D=101&LfdbFeedStatusForm%5Bzip%5D=61801&LfdbFeedStatusForm%5Bradius%5D=50&LfdbFeedStatusForm%5Bspecies%5D=&LfdbFeedStatusForm%5BsortAttribute%5D=recency&LfdbFeedStatusForm%5BdateRange%5D=180&page=1","https://www.pawboost.com/lost-found-pets/index?LfdbFeedStatusForm%5BattributeSearch%5D=&LfdbFeedStatusForm%5Bstatus%5D%5B0%5D=100&LfdbFeedStatusForm%5Bstatus%5D%5B1%5D=101&LfdbFeedStatusForm%5Bzip%5D=61801&LfdbFeedStatusForm%5Bradius%5D=50&LfdbFeedStatusForm%5Bspecies%5D=&LfdbFeedStatusForm%5BsortAttribute%5D=recency&LfdbFeedStatusForm%5BdateRange%5D=180&page=2"]
#petfbiindexurl = "http://search.lostpetusa.net/search.aspx?q=illinois"
for pawboosturl in pawboosturls:
    time.sleep(5)
    indexreq = Request(pawboosturl,headers={'User-Agent': 'Mozilla/5.0'})
    indexhandle=urlopen(indexreq)
    indexcontent=indexhandle.read()
    indexhandle.close()
    index_html = BeautifulSoup(indexcontent, "html.parser")
    for hit in index_html.findAll("div", attrs={"data-key":True}):
        specific_url = hit.find("a")['href']
        print(specific_url)
        if specific_url in ExistedURL:
            print("already existed")
            continue
        time.sleep(5)
        specireq = Request(specific_url,headers={'User-Agent': 'Mozilla/5.0'})
        specihandle=urlopen(specireq)
        specicontent=specihandle.read()
        specihandle.close()
        speci_html = BeautifulSoup(specicontent, "html.parser")
        tempData = {}
        tempData['comments'] = []
        tempData['notes'] = None
        tempData['userid'] = None
        tempData['name'] = None
        tempData['type'] = None
        tempData['found'] = None
        tempData['breed'] = None
        tempData['color'] = None
        tempData['size'] = None
        tempData['gender'] = None
        tempData['date']=current_date
        tempData['original_website'] = specific_url
        tempData['img_url'] = speci_html.find("img",{"class":" no-padding widget-image pet-details-featured-image width-full"})['src']
        tempData['description'] = None
        tempData['location'] = None
        tempData['datefound'] = None
        container_html =speci_html.find("div",{"id":"float-container-1"});
        temp_location = ""
        for ahit1 in container_html.findAll("div",{"class":"row border-bottom-gray"}):
            if ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "NAME":
                tempData['name'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
        for ahit1 in container_html.findAll("div",{"class":"row border-bottom-gray space-20"}):
            if ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "NAME":
                tempData['name'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "SEX":
                tempData['gender'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "SEX":
                tempData['gender'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "STATUS":
                if ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip() == "LOST":
                    tempData['found'] = False
                else:
                    tempData['found'] = True
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "SPECIES":
                tempData['type'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "DESCRIPTION":
                tempData['description'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "AREA LAST SEEN":
                temp_location += ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "ADDRESS LAST SEEN":
                temp_location = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip() + ", "+ temp_location
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "DATE LAST SEEN":
                tempData['datefound'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "AREA FOUND":
                temp_location += ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "ADDRESS FOUND":
                temp_location = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip() + ", "+ temp_location
            elif ahit1.find("div",{"class":"col-md-4 col-xs-4"}).text.strip() == "DATE FOUND":
                tempData['datefound'] = ahit1.find("div",{"class":"col-md-8 col-xs-8"}).text.strip()
        postToDatabase(tempData)



lostcraiglists = ["https://chambana.craigslist.org/search/laf?lost_and_found_type=1&postal=61820&search_distance=200","https://chambana.craigslist.org/search/laf?s=120&lost_and_found_type=1&postal=61820&search_distance=200","https://chambana.craigslist.org/search/laf?s=240&lost_and_found_type=1&postal=61820&search_distance=200","https://chambana.craigslist.org/search/laf?s=360&lost_and_found_type=1&postal=61820&search_distance=200"]
foundcraiglists = ["https://chambana.craigslist.org/search/laf?search_distance=200&postal=61820&lost_and_found_type=2","https://chambana.craigslist.org/search/laf?s=120&lost_and_found_type=2&postal=61820&search_distance=200"]
for lostcraiglist in lostcraiglists:
    time.sleep(5)
    indexreq = Request(lostcraiglist,headers={'User-Agent': 'Mozilla/5.0'})
    indexhandle=urlopen(indexreq)
    indexcontent=indexhandle.read()
    indexhandle.close()
    index_html = BeautifulSoup(indexcontent, "html.parser")
    for hit in index_html.findAll("li",{"class":"result-row"}):
        temp_a = hit.find("a","result-title hdrlnk")
        temp_title =temp_a.text.lower()
        print(temp_title)
        if "dog" in temp_title or "cat" in temp_title or "kitty" in temp_title or "kitten" in temp_title:
            specific_url = temp_a['href']
            print(specific_url)
            if specific_url in ExistedURL:
                print("already existed")
                continue
            time.sleep(5)
            tempData = {}
            tempData['comments'] = []
            tempData['notes'] = None
            tempData['userid'] = None
            tempData['name'] = None
            tempData['found'] = False
            tempData['breed'] = None
            tempData['color'] = None
            tempData['size'] = None
            tempData['gender'] = None
            tempData['date']=hit.find("time",{"class":"result-date"})['datetime'].replace(" ","T") + ":00"
            tempData['original_website'] = specific_url
            tempData['img_url'] = None
            temp_location = ""
            if hit.find("span",{"class":"nearby"}):
                temp_location = hit.find("span",{"class":"nearby"}).text
                if len(temp_location) >= 7:
                    temp_location = temp_location[7:-1] + ", "
                else:
                    temp_location = ""
                if (hit.find("span",{"class":"nearby"}).has_attr('title')):
                    temp_location += hit.find("span",{"class":"nearby"})['title']
            tempData['location'] = temp_location
            tempData['datefound'] = tempData['date']
            if "dog" in temp_title:
                tempData['type'] = "dog"
            else:
                tempData['type'] = "cat"
            specireq = Request(specific_url,headers={'User-Agent': 'Mozilla/5.0'})
            specihandle=urlopen(specireq)
            specicontent=specihandle.read()
            specihandle.close()
            speci_html = BeautifulSoup(specicontent, "html.parser")
            for hitimg in speci_html.findAll("img",{"title":" 1","alt":" 1"}):
                tempData['img_url'] = hitimg['src']
                break
            if speci_html.find("section",{"id":"postingbody"}):
                tempData['description'] = speci_html.find("section",{"id":"postingbody"}).text.replace("QR Code Link to This Post","").strip()
            else:
                print("!!!no content")
                continue
            temp_description =tempData['description'].lower()
            if ' male ' in temp_description or ' he ' in temp_description:
                tempData['gender'] = "Male"
            if ' female ' in temp_description or ' she ' in temp_description:
                tempData['gender'] = "Female"
            postToDatabase(tempData)

for foundcraiglist in foundcraiglists:
    time.sleep(5)
    indexreq = Request(foundcraiglist,headers={'User-Agent': 'Mozilla/5.0'})
    indexhandle=urlopen(indexreq)
    indexcontent=indexhandle.read()
    indexhandle.close()
    index_html = BeautifulSoup(indexcontent, "html.parser")
    for hit in index_html.findAll("li",{"class":"result-row"}):
        temp_a = hit.find("a","result-title hdrlnk")
        temp_title =temp_a.text.lower()
        print(temp_title)
        if "dog" in temp_title or "cat" in temp_title or "kitty" in temp_title or "kitten" in temp_title:
            specific_url = temp_a['href']
            print(specific_url)
            if specific_url in ExistedURL:
                print("already existed")
                continue
            time.sleep(5)
            tempData = {}
            tempData['comments'] = []
            tempData['notes'] = None
            tempData['userid'] = None
            tempData['name'] = None
            tempData['found'] = True
            tempData['breed'] = None
            tempData['color'] = None
            tempData['size'] = None
            tempData['gender'] = None
            tempData['date']=hit.find("time",{"class":"result-date"})['datetime'].replace(" ","T") + ":00"
            tempData['original_website'] = specific_url
            tempData['img_url'] = None
            temp_location = ""
            if hit.find("span",{"class":"nearby"}):
                temp_location = hit.find("span",{"class":"nearby"}).text
                if len(temp_location) >= 7:
                    temp_location = temp_location[7:-1] + ", "
                else:
                    temp_location = ""
                if (hit.find("span",{"class":"nearby"}).has_attr('title')):
                    temp_location += hit.find("span",{"class":"nearby"})['title']
            tempData['location'] = temp_location
            tempData['datefound'] = tempData['date']
            if "dog" in temp_title:
                tempData['type'] = "dog"
            else:
                tempData['type'] = "cat"
            specireq = Request(specific_url,headers={'User-Agent': 'Mozilla/5.0'})
            specihandle=urlopen(specireq)
            specicontent=specihandle.read()
            specihandle.close()
            speci_html = BeautifulSoup(specicontent, "html.parser")
            for hitimg in speci_html.findAll("img",{"title":" 1","alt":" 1"}):
                tempData['img_url'] = hitimg['src']
                break
            if speci_html.find("section",{"id":"postingbody"}):
                tempData['description'] = speci_html.find("section",{"id":"postingbody"}).text.replace("QR Code Link to This Post","").strip()
            else:
                print("!!!no content")
                continue
            temp_description =tempData['description'].lower()
            if ' male ' in temp_description or ' he ' in temp_description:
                tempData['gender'] = "Male"
            if ' female ' in temp_description or ' she ' in temp_description:
                tempData['gender'] = "Female"
            postToDatabase(tempData)



