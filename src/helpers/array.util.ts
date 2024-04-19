export class ArrayUtil {
    static distinctArray<T>(arr: Array<T>, type: T): Array<T> {
        return arr.filter((value, index, self) => {
            return self.indexOf(value) === index && typeof value === type;
        });
    }
}