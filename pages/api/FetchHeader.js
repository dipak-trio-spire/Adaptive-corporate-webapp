const fetchHeader = async (req, res) => {
    try {
        const response = await fetch('https://adaptive-investments.com/wp-json/custom/v1/page-content/572');
        const data = await response.json();
        res.status(200).json({ headerText: data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch headerText' });
    }
};

export default fetchHeader;
