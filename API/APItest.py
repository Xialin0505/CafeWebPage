import requests
import json

def fetchAllReservation():
    URL = "http://localhost:8080/API/allReservation"
    data = ""

    response = requests.get(URL, data)
    print(json.dumps(response.json(), indent=4))


def makeReservation(name, groupsize, date, phonenumber, message=None):
    URL = "http://localhost:8080/API/makeReservation"

    data =  {
             "ReservationName": name,
             "PhoneNumber": phonenumber,
             "GroupSize": groupsize,
             "ReservationDate": date,
             "ReservationMessages": message
            }

    response = requests.post(URL, data)
    #print(json.dumps(response.json(), indent=4))
    print(response)

def fetchOneReservation(name, phonenumber, date):
    URL = "http://localhost:8080/API/oneReservation"
    
    data =  {
             "ReservationName": name,
             "PhoneNumber": phonenumber,
             "ReservationDate": date,
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
    makeReservation("test", 1, "2022-11-17 01:00:00", "5192223333")
    #makeReservation("test", 1, "2022-11-17 01:00:00", "5192223334", "message")
    #fetchOneReservation("test", "5192223333", "2022-11-17 01:00:00")
    #fetchReservationByDate("2022-11-17")