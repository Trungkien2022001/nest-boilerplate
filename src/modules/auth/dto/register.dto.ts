import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayNotEmpty,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { APPLICATION, EMAIL, OTP, PASSWORD_PATTERN, USER } from 'src/constants';
import { USER_VALIDATOR } from 'src/constants/validator/user.validator';


export class RegisterDto {
    @ApiProperty({
        type: String,
        description: 'First name',
    })
    @IsString()
    @IsNotEmpty({ message: i18nValidationMessage(USER.FIRST_NAME_NOT_EMPTY as never) })
    @MaxLength(USER_VALIDATOR.FIRST_NAME_MAX_LENGTH,
        { message: i18nValidationMessage(USER.FIRST_NAME_MAX_LENGTH as never, { max: USER_VALIDATOR.FIRST_NAME_MAX_LENGTH }) })
    @Transform(({ value }) => value.trim())
    first_name: string;

    @ApiProperty({
        type: String,
        description: 'Last name',
    })
    @IsString()
    @IsNotEmpty({
        message: i18nValidationMessage(USER.LAST_NAME_NOT_EMPTY as never),
    })
    @MaxLength(USER_VALIDATOR.LAST_NAME_MAX_LENGTH,
        { message: i18nValidationMessage(USER.LAST_NAME_MAX_LENGTH as never, { max: USER_VALIDATOR.LAST_NAME_MAX_LENGTH }) })
    @Transform(({ value }) => value.trim())
    last_name: string;

    @ApiProperty({
        type: String,
        description: 'Email',
    })
    @IsString()
    @IsEmail(
        {},
        { message: i18nValidationMessage(EMAIL.EMAIL_FORMAT_INCORRECT as never) },
    )
    @IsNotEmpty({ message: i18nValidationMessage(EMAIL.EMAIL_NOT_EMPTY as never) })
    @MaxLength(USER_VALIDATOR.EMAIL_MAX_LENGTH,
        { message: i18nValidationMessage(EMAIL.EMAIL_MAX_LENGTH as never, { max: USER_VALIDATOR.EMAIL_MAX_LENGTH }) })
    @Transform(({ value }) => value.trim())
    email: string;

    @ApiProperty({
        type: String,
        description: 'Password',
    })
    @IsString()
    @Matches(PASSWORD_PATTERN, { message: i18nValidationMessage(USER.PASSWORD_FORMAT_INCORRECT as never) })
    @MinLength(USER_VALIDATOR.PASSWORD_MIN_LENGTH,
        { message: i18nValidationMessage(USER.PASSWORD_MIN_LENGTH as never, { min: USER_VALIDATOR.PASSWORD_MIN_LENGTH }) })
    @MaxLength(USER_VALIDATOR.PASSWORD_MAX_LENGTH,
        { message: i18nValidationMessage(USER.PASSWORD_MAX_LENGTH as never, { max: USER_VALIDATOR.PASSWORD_MAX_LENGTH }) })
    @IsNotEmpty({
        message: i18nValidationMessage(USER.PASSWORD_NOT_EMPTY as never),
    })
    @Transform(({ value }) => value.trim())
    password: string;
}