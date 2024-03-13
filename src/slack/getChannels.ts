import fetch from 'node-fetch'


export const getChannels = async (token: string) => {
    // get list of channels from slack
    const response = await fetch('https://slack.com/api/conversations.list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data:any = await response.json()

    console.log('CHANNEL_ID | CHANNEL_NAME')
    data.channels.forEach((channel: { id: string; name: string }) => {
        if (channel.name.startsWith('times')){
        console.log(`${channel.id} | ${channel.name}`)
        }
    })

    return data
}

await getChannels(process.env.SLACK_API_TOKEN)