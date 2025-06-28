import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PacsService } from './pacs.service';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';
import { CreatePacsReportDto, PostDicomViewerDto } from './pacs.dto';
import { BV_QLyCapTheService } from '../BV_QLyCapThe/BV_QLyCapThe.service';
import { BV_PhieuChidinhDVCTService } from '../BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.service';

@Controller('pacs')
export class PacsController {
    private readonly logger = new Logger(PacsController.name);

    constructor(private readonly pacsService: PacsService,
        private readonly qLyCapTheService: BV_QLyCapTheService,
        private readonly phieuChidinhDVCTService: BV_PhieuChidinhDVCTService) { }

    @Public()
    @Get('all')
    async getThongBao() {
        try {
            return ApiResponse.success('Get thong bao success!');
        } catch (ex) {
            return ApiResponse.error('Get thong bao failed!', 500, ex.message);
        }
    }

    @Public()
    @Post('reports')
    async createReport(@Body() body: CreatePacsReportDto) {
        try {
            // TODO: xử lý lưu dữ liệu từ PACS vào HIS
            return ApiResponse.success('Get thong bao success!');
        } catch (ex) {
            return ApiResponse.error('Get thong bao failed!', 500, ex.message);
        }
    }

    @Public()
    @Post('dicom-viewer/:patient_id/:accession_number')
    async dicomViewer(@Param('patient_id') patientId: string,
        @Param('accession_number') accessionNumber: string,
        @Body() body: PostDicomViewerDto) {

        this.logger.log(`Data post dicom-viewer: ${JSON.stringify({ patientId, accessionNumber, body })}`)

        try {
            const phieu = await this.phieuChidinhDVCTService.findById({
                SoPhieuCD: accessionNumber,
            });

            if (!phieu || !phieu.length) {
                this.logger.log(`Data post dicom-viewer: Update link failed! Not find item!`)
                return ApiResponse.error('Post dicom viewer failed!', 500, "Not find item!");
            }

            phieu[0].LinkImage = body.image_viewer_link;

            await this.phieuChidinhDVCTService.update({
                SoPhieuCD: accessionNumber,
                MaBN: patientId
            }, phieu[0]);

            this.logger.log(`Data post dicom-viewer: Update link success!`)

            return ApiResponse.success('Update link success!');
        } catch (ex) {
            this.logger.log(`Data post dicom-viewer: Update link failed! ${ex.message}`)
            return ApiResponse.error('Update link failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('patient-info/:patient_id')
    async patientInfo(@Param('patient_id') patientId: string) {
        try {
            const result = await this.qLyCapTheService.findById({
                Ma: patientId
            });

            if (!result || !result.length) {
                return ApiResponse.error('Post dicom viewer failed!', 500, "Not find item!");
            }

            return ApiResponse.success('Get patient info success!', result[0]);
        } catch (ex) {
            return ApiResponse.error('Get patient info failed!', 500, ex.message);
        }
    }
}
