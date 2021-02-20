package doit.now.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //...

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http // HttpSecurity 객체를 설정한다.
                .authorizeRequests() // 권한요청 처리 설정 메서드이다.
//                .antMatchers("/private/**").hasAnyRole("USER") // /private 이하의 모든 요청은 USER 역할이 있어야한다.
                .anyRequest().permitAll() // 다른 요청은 누구든지 접근 할 수 있다.
                .and()
                .formLogin()
                .loginPage("/login"); // 이곳이 추가 되었다.
               // http.csrf().disable();
    }

    //...
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/**/css", "/**/js","/../**.css");
    }
}
