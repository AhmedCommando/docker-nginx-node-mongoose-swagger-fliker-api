import { FlikrInterface } from './flikr.interface';

export default function makeFlikr(flikrImages: []): Readonly<FlikrInterface[]> {
    return Object.freeze(normalize(flikrImages));

    function normalize(data: []): FlikrInterface[] {
        return data.map((item: any) => <FlikrInterface>{
            title: item.title,
            link: item.link,
            description: item.description,
            authorName: getAuthorName(item.author),
            authorLink: getAuthorLink(item.author_id),
            image: item.media.m,
            tags: getTags(item.tags)
        });
    }

    function getAuthorName(name: string): string {
        return name.replace('nobody@flickr.com', '')
            .replace(' ', '')
            .replace('("', '')
            .replace('")', '');
    }

    function getAuthorLink(id: string): string {
        return `https://www.flickr.com/people/${id}`;
    }

    function getTags(tags: string): string {
        if (tags === '') {
            return tags;
        }
        return tags.split(' ').join(',');
    }
}
