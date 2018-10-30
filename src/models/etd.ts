export class EtdModel {
  constructor(public title: string,
              public topic: string,
              public author_name: string,
              public place_name: string,
              public publisher_name: string,
              public edition: string,
              public language_name: string,
              public gmd_name: string,
              public collation: string,
              public notes: string,
              public classification: string,
              public isbn_issn: string,
              public call_number: string,
              public image: string,
              public publish_year: string,
              public file_title: string,
              public nim_sha1: string,
              public embargo: string
            ) {}
}
