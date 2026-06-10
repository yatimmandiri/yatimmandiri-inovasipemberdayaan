import { notification } from './toast';

export const copyText = (value: string) => {
    navigator.clipboard.writeText(value);
    notification({ message: 'Berhasil Copy Text', type: 'success' });
};

export const getStorageUrl = (value: string, index?: number) => {
  return value ? `/storage/${value}` : 'https://picsum.photos/1920/1080?random=' + index;
}

export const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match?.[1]
        ? `https://www.youtube.com/embed/${match[1]}`
        : url;
};
