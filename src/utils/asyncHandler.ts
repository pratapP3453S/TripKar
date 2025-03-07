import { NextApiRequest, NextApiResponse } from 'next';

type AsyncFunction = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (error?: any) => void
) => Promise<any>;

const asyncHandler = (fn: AsyncFunction) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await fn(req, res, (error) => {
                if (error) {
                    throw error;
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal Server Error',
            });
        }
    };
};

export default asyncHandler;