
module.exports = function (forms) {
    return {
        id: forms.id,
        publishedAt: forms.createdAt.toLocaleDateString(),
        name: forms.name,
        telephone: forms.telephone,
        title: forms.title,
    }
}