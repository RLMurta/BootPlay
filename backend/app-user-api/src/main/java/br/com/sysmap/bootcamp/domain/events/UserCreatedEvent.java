package br.com.sysmap.bootcamp.domain.events;

import br.com.sysmap.bootcamp.domain.entities.Users;
import org.springframework.context.ApplicationEvent;

public class UserCreatedEvent extends ApplicationEvent {

    private final Users user;

    public UserCreatedEvent(Object source, Users user) {
        super(source);
        this.user = user;
    }

    public Users getUser() {
        return user;
    }
}
