package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;

@Entity
@Table(name = "tabONG")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OngModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String razaosocial;
    @Email
    private String email;
    private String cnpj;
    private String telefone;
    private String cep;
    private String estado;
    private String cidade;
    private String bairro;
    private String logradouro;
    private Integer numero;
    private String complemento;

}
