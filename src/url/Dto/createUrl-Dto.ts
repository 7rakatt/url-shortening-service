import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class creatUrlDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;

}
