export default [
    {
        type: 'link',
        label: 'Categories',
        url: '#',
    },
    {
        type: 'link',
        label: 'Account',
        url: '#',
    },
    {
        type: 'link',
        label: 'Pages',
        url: '/site/about-us',
        children: [
            { type: 'link', label: 'About Us', url: '/site/about-us' },
            { type: 'link', label: 'Contact Us', url: '/site/contact-us' },
            { type: 'link', label: 'Terms And Conditions', url: '/site/terms' },
            { type: 'link', label: 'FAQ', url: '/site/faq' },
        ],
    },
];
