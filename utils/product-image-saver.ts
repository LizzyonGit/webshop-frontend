import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function saveProductImage(file: File, slug: string): Promise<string | undefined> {
  if (!(file instanceof File) || file.size === 0) {
    return undefined;
  }

  if (file.type !== 'image/webp') {
    throw new Error('Only WebP images are allowed.');
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error('Image must be smaller than 5 MB.');
  }

  const filename = `${slug}.webp`;

  const imagesDirectory = path.join(process.cwd(), 'public', 'images');

  await mkdir(imagesDirectory, { recursive: true });

  const filePath = path.join(imagesDirectory, filename);

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/images/${filename}`;
}
