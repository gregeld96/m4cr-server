import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createMangroveLocation } from "./services/create_location";
import { createMangroveSpecies } from "./services/create_species";
import { createMangroveBio } from "./services/create_diversity";
import { createMangroveNtfp } from "./services/create_ntfp";
import { createMangroveAcitvity } from "./services/create_human_activity";
import { createMangrovePanolense } from "./services/create_panolense";
import { getMangroveDetail } from "./services/get_detail";
import { getMangroveDetailPanolense } from "./services/get_panolense";
import { softDeleteLocation } from "./services/soft_delete_location";
import { hardDeleteSpecies } from "./services/hard_delete_species";
import { hardDeleteBiodiversity } from "./services/hard_delete_diversity";
import { hardDeletePanolense } from "./services/hard_delete_panolense";
import { hardDeleteActivity } from "./services/hard_delete_activity";
import { hardDeleteNtfp } from "./services/hard_delete_ntfp";
import { updateMangroveSpecies } from "./services/update_species";
import { updateMangroveBiodiversity } from "./services/update_biodiversity";
import { updateMangroveActivity } from "./services/update_activity";
import { updateMangroveNtfp } from "./services/update_ntfp";
import { updateMangroveLocation } from "./services/update_location";
import { getMangroveList } from "./services/get_all";
import { GetLocationListFilterDTO } from "src/validator/mangrove";

class MangroveAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetLocationListFilterDTO;

        try {
            const data = await getMangroveList({
                ...filter,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove location info');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getMangroveDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove location detail info');
        } catch(err) {
            next(err)
        }
    }

    static async getPanolense(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getMangroveDetailPanolense(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove panolense detail info');
        } catch(err) {
            next(err)
        }
    }

    static async createLocation(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangroveLocation(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove location');
        } catch(err) {
            next(err)
        }
    }

    static async updateLocation(req: Request, res: Response, next: NextFunction) {
        try {
            await updateMangroveLocation({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, null, 'Success update mangrove location');
        } catch(err) {
            next(err)
        }
    }

    static async createSpecies(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangroveSpecies({
                ...req.body,
                locationId: Number(req.params.id),
            });

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove species');
        } catch(err) {
            next(err)
        }
    }

    static async updateSpecies(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateMangroveSpecies({
                ...req.body,
                id: Number(req.params.speciesMangroveId),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update mangrove species');
        } catch(err) {
            next(err)
        }
    }

    static async createBiodiversity(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangroveBio({
                ...req.body,
                locationId: Number(req.params.id),
            });

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async updateBiodiversity(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateMangroveBiodiversity({
                ...req.body,
                id: Number(req.params.bioMangroveId),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update mangrove biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async createNtfp(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangroveNtfp({
                ...req.body,
                locationId: Number(req.params.id),
            });

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove ntfp');
        } catch(err) {
            next(err)
        }
    }

    static async updateNtfp(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateMangroveNtfp({
                ...req.body,
                id: Number(req.params.ntfpId),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update mangrove ntfp');
        } catch(err) {
            next(err)
        }
    }

    static async createActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangroveAcitvity({
                ...req.body,
                locationId: Number(req.params.id),
            });

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove activity');
        } catch(err) {
            next(err)
        }
    }

    static async updateActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateMangroveActivity({
                ...req.body,
                id: Number(req.params.activityId),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update mangrove activity');
        } catch(err) {
            next(err)
        }
    }

    static async createPanolense(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createMangrovePanolense({
                ...req.body,
                locationId: Number(req.params.id),
            });

            response(res, ResStatus.CREATED, true, data, 'Success create mangrove panolense');
        } catch(err) {
            next(err)
        }
    }

    static async softDeleteLocation(req: Request, res: Response, next: NextFunction) {
        try {
            await softDeleteLocation(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, null, 'Success soft delete mangrove location');
        } catch(err) {
            next(err)
        }
    }

    static async hardDeleteSpecies(req: Request, res: Response, next: NextFunction) {
        try {
            await hardDeleteSpecies(Number(req.params.speciesMangroveId));

            response(res, ResStatus.SUCCESS, true, null, 'Success hard delete mangrove species');
        } catch(err) {
            next(err)
        }
    }

    static async hardDeleteBio(req: Request, res: Response, next: NextFunction) {
        try {
            await hardDeleteBiodiversity(Number(req.params.bioMangroveId));

            response(res, ResStatus.SUCCESS, true, null, 'Success hard delete mangrove biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async hardDeletePanolense(req: Request, res: Response, next: NextFunction) {
        try {
            await hardDeletePanolense(Number(req.params.panolenseId));

            response(res, ResStatus.SUCCESS, true, null, 'Success hard delete mangrove panolense');
        } catch(err) {
            next(err)
        }
    }

    static async hardDeleteActivity(req: Request, res: Response, next: NextFunction) {
        try {
            await hardDeleteActivity(Number(req.params.activityId));

            response(res, ResStatus.SUCCESS, true, null, 'Success hard delete mangrove human activity');
        } catch(err) {
            next(err)
        }
    }

    static async hardDeleteNtfp(req: Request, res: Response, next: NextFunction) {
        try {
            await hardDeleteNtfp(Number(req.params.ntfpId));

            response(res, ResStatus.SUCCESS, true, null, 'Success hard delete mangrove ntfp');
        } catch(err) {
            next(err)
        }
    }
}

export default MangroveAdminController;