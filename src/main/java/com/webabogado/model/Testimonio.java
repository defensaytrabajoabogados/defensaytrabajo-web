package com.webabogado.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Testimonio {
    private String nombre;
    private String testimonio;
    private String fecha;

    public Testimonio() {}

    public Testimonio(String nombre, String testimonio) {
        this.nombre = nombre;
        this.testimonio = testimonio;
        this.fecha = LocalDate.now().format(DateTimeFormatter.ofPattern("d 'de' MMMM, yyyy"));
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getTestimonio() { return testimonio; }
    public void setTestimonio(String testimonio) { this.testimonio = testimonio; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String toFileString() {
        return nombre + "|||" + testimonio + "|||" + fecha;
    }

    public static Testimonio fromFileString(String line) {
        String[] parts = line.split("\\|\\|\\|");
        if (parts.length < 3) return null;
        Testimonio t = new Testimonio();
        t.setNombre(parts[0]);
        t.setTestimonio(parts[1]);
        t.setFecha(parts[2]);
        return t;
    }
}
