import fetch from 'node-fetch';

import cheerio from 'cheerio';

export async function getThumbnailURL(workshop_id: string): Promise<string> {
  let res = await fetch(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(workshop_id)}`);
  let text = await res.text();

  const $ = cheerio.load(text);
  let url = $('#previewImage').attr('src') ?? $('#previewImageMain').attr('src');
  return url;
}
