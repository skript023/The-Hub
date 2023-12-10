
export default function Decrypt(text: string)
{
    const key = import.meta.env.VITE_ENCRPYPT_KEY as string;
    return Array.from(text, (_c, i) =>
        String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length),
        ),
    ).join('');
}