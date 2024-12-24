import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "src/dtos/signup.dto";
import { SignInDto } from "src/dtos/signin.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    async signUp(@Body() signupData: SignupDto){        
        return this.authService.signUp(signupData);
    }
    
    @Post('signin')
    async signIn(@Body() signInData: SignInDto){        
        return this.authService.signIn(signInData);
    }
}