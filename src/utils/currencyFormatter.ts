const currencyFormatter = (amount: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2, // Ensure at least two decimal places for cents
            maximumFractionDigits: 2,
            currency: 'NGN'
        })
        return formatter.format(amount)
}

export default currencyFormatter