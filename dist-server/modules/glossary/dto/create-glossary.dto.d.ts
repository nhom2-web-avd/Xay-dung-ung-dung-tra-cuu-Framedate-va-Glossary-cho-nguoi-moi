import type { GlossaryLevel } from '../../../entities/glossary.entity';
export declare class CreateGlossaryDto {
    term: string;
    definition: string;
    level?: GlossaryLevel;
    video_url?: string;
}
