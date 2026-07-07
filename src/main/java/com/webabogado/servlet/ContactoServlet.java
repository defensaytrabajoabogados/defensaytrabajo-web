package com.webabogado.servlet;

import com.webabogado.model.Contacto;
import java.io.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/enviar-contacto")
public class ContactoServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String nombre = request.getParameter("nombre");
        String email = request.getParameter("email");
        String telefono = request.getParameter("telefono");
        String area = request.getParameter("area");
        String mensaje = request.getParameter("mensaje");

        if (nombre == null || email == null || mensaje == null ||
            nombre.trim().isEmpty() || email.trim().isEmpty() || mensaje.trim().isEmpty()) {
            response.sendRedirect("index.jsp#contacto?msg=" + java.net.URLEncoder.encode("Por favor complete los campos obligatorios.", "UTF-8") + "&tipo=error");
            return;
        }

        Contacto contacto = new Contacto(nombre.trim(), email.trim(),
            telefono != null ? telefono.trim() : "",
            area != null ? area.trim() : "",
            mensaje.trim());

        String dataDir = System.getProperty("java.io.tmpdir") + "/webabogado";
        File dir = new File(dataDir);
        if (!dir.exists()) dir.mkdirs();

        try (FileWriter fw = new FileWriter(new File(dir, "contactos.txt"), true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            out.println(contacto.toFileString());
        }

        response.sendRedirect("index.jsp#contacto?msg=" +
            java.net.URLEncoder.encode("Mensaje enviado con éxito. Le contactaremos pronto.", "UTF-8") +
            "&tipo=success");
    }
}
