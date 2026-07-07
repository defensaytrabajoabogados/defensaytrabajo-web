package com.webabogado.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Contacto {
    private String nombre;
    private String email;
    private String telefono;
    private String area;
    private String mensaje;
    private String fecha;

    public Contacto() {}

    public Contacto(String nombre, String email, String telefono, String area, String mensaje) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.area = area;
        this.mensaje = mensaje;
        this.fecha = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String toFileString() {
        return nombre + "|||" + email + "|||" + telefono + "|||" + area + "|||" + mensaje + "|||" + fecha;
    }

    public static Contacto fromFileString(String line) {
        String[] parts = line.split("\\|\\|\\|");
        if (parts.length < 6) return null;
        Contacto c = new Contacto();
        c.setNombre(parts[0]);
        c.setEmail(parts[1]);
        c.setTelefono(parts[2]);
        c.setArea(parts[3]);
        c.setMensaje(parts[4]);
        c.setFecha(parts[5]);
        return c;
    }
}
