// Function to handle HTTP requests
export default async function GET(req, res,{params}) {
    // Extract query parameters
    const { username } = params;
 
    try {
        // Find student by username
        const result = await prisma.User.findUnique({
            where: { username },
            select: { name: true, course: true, result: true },
        });
 
        // If student not found, return 404 status
        if (!result) {
            return res.status(404).json({ error: 'Student not found' });
        }
 
        // If student found, return 200 status and student data
        return res.status(200).json(result);
    } catch (error) {
        // Log error and return 500 status if any error occurs
        console.error('Error fetching result:', error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Disconnect from the Prisma database
        await prisma.$disconnect();
    }
}