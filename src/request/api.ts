export const toSearchQQ = (value: string) => {
    return fetch(`https://api.uomg.com/api/qq.info?qq=${value}`).then((res) => res.json());
}