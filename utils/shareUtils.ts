export type SharePlatform = 'copy' | 'whatsapp' | 'facebook' | 'linkedin';

export const shareContent = (
    platform: SharePlatform, 
    text: string, 
    url: string = window.location.href,
    onSuccess?: () => void
) => {
    switch (platform) {
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                if (onSuccess) onSuccess();
            });
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            break;
    }
};