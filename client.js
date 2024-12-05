import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: '3w5q4fmv', // you can find this in sanity.json
    apiVersion: '2021-03-25',


    
    dataset: 'pzdataset', // or the name you chose in step 1
    useCdn: true // `false` if you want to ensure fresh data

  })