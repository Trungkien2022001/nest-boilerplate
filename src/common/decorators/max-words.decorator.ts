import { ValidationOptions, registerDecorator } from 'class-validator';

export function MaxWords(max: number, options?: ValidationOptions) {
    return (object, propertyName: string) => {
        registerDecorator({
            name: 'isMaxWords',
            target: object.constructor,
            propertyName,
            options,
            validator: {
                validate(value: string) {
                    const words = value.trim().split(/\s+/);
                    return words.length <= max;
                },
                defaultMessage(args) {
                    return `${args.property} greater than ${max} words`;
                },
            },
        });
    };
}