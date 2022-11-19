DROP TABLE IF EXISTS Reservation;
CREATE TABLE Reservation(
    ReservationName varchar(50) NOT NULL,
    PhoneNumber varchar(50) NOT NULL,
    GroupSize int NOT NULL,
    ReservationDate datetime NOT NULL,
    ReservationMessages varchar(1000),
    primary key (ReservationName, PhoneNumber, ReservationDate)
);