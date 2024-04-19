export class StringUtils {
    static trimMultiSpace(value: string): string {
        return value.replace(/\s+/g, ' ').trim();
    }
}
