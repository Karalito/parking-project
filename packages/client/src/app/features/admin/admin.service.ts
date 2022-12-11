import { HttpClient } from '@angular/common/http';
import { DOMAIN_NAMES } from 'src/app/shared/enums/domain-names.enum';
import { Injectable } from '@angular/core';
import { Hardware } from '../../shared/models/hardware.model';
import { ParkingSpace } from '../../shared/models/parking-space.model';
import { RoomSpace } from '../../shared/models/room-space.model';
import { Table } from '../../shared/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  // Table
  getTables() {
    return this.http.get(`${DOMAIN_NAMES.URL}tables`);
  }

  addTable(table: Table) {
    return this.http.post(`${DOMAIN_NAMES.URL}tables`, table);
  }

  deleteTable(id: string) {
    return this.http.delete(`${DOMAIN_NAMES.URL}tables/${id}`);
  }

  // Hardware
  getHardware() {
    return this.http.get(`${DOMAIN_NAMES.URL}hardware`);
  }

  addHardware(hardware: Hardware) {
    return this.http.post(`${DOMAIN_NAMES.URL}hardware`, hardware);
  }

  deleteHardware(id: string) {
    return this.http.delete(`${DOMAIN_NAMES.URL}hardware/${id}`);
  }

  // Room Space
  getRoomSpaces() {
    return this.http.get(`${DOMAIN_NAMES.URL}room-spaces`);
  }

  getRoomSpace(id: string) {
    return this.http.get(`${DOMAIN_NAMES.URL}room-spaces/${id}`);
  }

  addRoomSpace(roomSpace: RoomSpace) {
    return this.http.post(`${DOMAIN_NAMES.URL}room-spaces`, roomSpace);
  }

  deleteRoomSpace(id: string) {
    return this.http.delete(`${DOMAIN_NAMES.URL}room-spaces/${id}`);
  }

  // Parking Space
  getParkingSpaces() {
    return this.http.get(`${DOMAIN_NAMES.URL}parking-spaces`);
  }

  addParkingSpace(parkingSpace: ParkingSpace) {
    return this.http.post(`${DOMAIN_NAMES.URL}parking-spaces`, parkingSpace);
  }

  deleteParkingSpace(id: string) {
    return this.http.delete(`${DOMAIN_NAMES.URL}parking-spaces/${id}`);
  }
}
