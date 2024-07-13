const selectImage = document.getElementById('select-artwork');
const inputFile = document.querySelector<HTMLInputElement>('#file');
const imgArea = document.querySelector<HTMLDivElement>('.img-area');

selectImage?.addEventListener('click', function () {
    document.getElementById('file')?.click();
});

inputFile?.addEventListener('change', function (event: Event) {
    const target = event.target as HTMLInputElement;
    const image = target.files?.[0];
    if (image && image.size < 8000000) {
        const reader = new FileReader();
        reader.onload = () => {
            const allImg = imgArea?.querySelectorAll<HTMLImageElement>('img');
            allImg?.forEach(item => item.remove());
            const imgUrl = reader.result as string;
            const img = document.createElement('img');
            img.src = imgUrl;
            imgArea?.appendChild(img);
            imgArea?.classList.add('active');
            imgArea!.dataset.img = image.name;
        };
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 8MB");
    }
});
