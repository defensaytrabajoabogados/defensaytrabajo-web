package com.webabogado.servlet;

import com.webabogado.model.Testimonio;
import java.io.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/enviar-testimonio")
public class TestimonioServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String nombre = request.getParameter("nombre");
        String testimonio = request.getParameter("testimonio");

        if (nombre == null || testimonio == null ||
            nombre.trim().isEmpty() || testimonio.trim().isEmpty()) {
            response.sendRedirect("index.jsp#testimonios?msg=" +
                java.net.URLEncoder.encode("Por favor complete todos los campos.", "UTF-8") +
                "&tipo=error");
            return;
        }

        Testimonio t = new Testimonio(nombre.trim(), testimonio.trim());

        String dataDir = System.getProperty("java.io.tmpdir") + "/webabogado";
        File dir = new File(dataDir);
        if (!dir.exists()) dir.mkdirs();

        try (FileWriter fw = new FileWriter(new File(dir, "testimonios.txt"), true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            out.println(t.toFileString());
        }

        response.sendRedirect("index.jsp#testimonios?msg=" +
            java.net.URLEncoder.encode("Testimonio enviado con éxito. ¡Gracias!", "UTF-8") +
            "&tipo=success");
    }
}
