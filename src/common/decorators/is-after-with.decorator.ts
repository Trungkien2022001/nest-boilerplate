import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

export function IsAfterWith(property: string, options?: ValidationOptions) {
    return (object, propertyName: string) => {
        registerDecorator({
            name: 'isAfterWith',
            target: object.constructor,
            propertyName,
            options,
            constraints: [property],
            validator: {
                validate(value: Date, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as Date)[relatedPropertyName];
                    return value >= relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${property} must be after ${relatedPropertyName}`;
                },
            },
        });
    };
}