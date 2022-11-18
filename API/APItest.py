import requests
import json

def fetchAllReservation():
    URL = "http://localhost:8080/API/allReservation"
    data = ""

    response = requests.get(URL, data)
    print(json.dumps(response.json(), indent=4))


def makeReservation(name, groupsize, date, message=None):
    URL = "http://localhost:8080/API/makeReservation"

    data =  {
             "ReservationName": name,
             "GroupSize": groupsize,
             "ReservationDate": date,
             "ReservationMessages": message
            }

    response = requests.post(URL, data)
    #print(json.dumps(response.json(), indent=4))
    print(response)

def fetchOneReservation(name, groupsize, date):
    URL = "http://localhost:8080/API/oneReservation"

    dateAndTime = date.split(" ")
    parsedDate = "T".join(dateAndTime) + ".000Z"
    
    data =  {
             "ReservationName": name,
             "GroupSize": groupsize,
             "ReservationDate": parsedDate,
            }

    response = requests.get(URL, data)
    print(json.dumps(response.json(), indent=4))

def fetchReservationByDate(date):
    URL = "http://localhost:8080/API/ReservationByDate"
    
    data =  {
             "ReservationDate": date,
            }

    response = requests.get(URL, data)
    print(json.dumps(response.json(), indent=4))

if __name__ == "__main__":
    # fetchAllReservation()
    # makeReservation("test", 1, "2022-11-17 01:00:00")
    # makeReservation("test", 1, "2022-11-17 01:00:00", "message")
    # fetchOneReservation("test", 1, "2020-11-17 01:00:00")
    fetchReservationByDate("2020-11-17")