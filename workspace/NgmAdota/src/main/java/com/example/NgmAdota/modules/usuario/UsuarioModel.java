package com.example.NgmAdota.modules.usuario;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.usuario.services.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.Period;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tabUsuario")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioModel implements UserDetails {
//    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Email(message = "o campo [email] deve conter um email válido")
    private String email;
    private LocalDate dataNascimento;
    private Long telefone;
    @NotBlank
    private String senha;
    private UserRole role;
    @ManyToOne()
    @JoinColumn(name = "ong_id", insertable = false, updatable = false)
    private OngModel ongModel;

    @Column(name = "ong_id")
    private Long ongId;
    private String cep;
    private String uf;
    private String cidade;
    private String bairro;
    private String logradouro;
    private Integer numero;
    private String complemento;
    @ManyToMany
    @JoinTable(name = "favoritos", joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id"))
    private Set<AnimalModel> favoritos = new HashSet<>();

    public UsuarioModel(String nome, String email, LocalDate dataNascimento, Long telefone, String senha, UserRole role, Long ongId, String cep, String uf, String cidade, String bairro, String logradouro, Integer numero, String complemento) {
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.senha = senha;
        this.role = role;
        this.ongId = ongId;
        this.cep = cep;
        this.uf = uf;
        this.cidade = cidade;
        this.bairro = bairro;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
    }


    public int idade() {
        LocalDate hoje = LocalDate.now();
        return Period.between(this.dataNascimento, hoje).getYears();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_ONG"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        } else if (this.role == UserRole.ONG) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ONG"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}