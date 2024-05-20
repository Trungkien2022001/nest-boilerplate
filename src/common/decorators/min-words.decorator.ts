import { ValidationOptions, registerDecorator } from 'class-validator';


export function MinWords(min: number, options?: ValidationOptions) {
    return (object, propertyName: string) => {
        registerDecorator({
            name: 'isMinWords',
            target: object.constructor,
            propertyName,
            options,
            validator: {
                validate(value: string) {
                    const words = value.trim().split(/\s+/);
                    return words.length >= min;
                },
                defaultMessage(args) {
                    return `${args.property} less than ${min} words`;
                },
            },
        });
    };
}