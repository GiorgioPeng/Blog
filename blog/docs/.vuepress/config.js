module.exports = {
  title: 'Blog',
  description: '分享一些笔记和平时解决的一些技术难题',
  themeConfig: {
    search: false,
    nav: [{
      text: '首页',
      link: '/'
    },
    {
      text: '前端',
      items: [{
        text: 'HTML',
        link: '/HTML/'
      },
      {
        text: 'CSS',
        link: '/CSS/'
      },
      {
        text: 'JavaScript',
        link: '/JavaScript/'
      },
      {
        text: 'Vue',
        link: '/Vue/'
      },
      {
        text: 'React',
        link: '/React/'
      }
      ]
    },
    {
      text: 'Web Security',
      link: '/WebS/'
    },
    {
      text: 'C',
      items: [{
        text: '算法',
        link: '/C/'
      },
      {
        text: 'C++ STL',
        link: '/STL/'
      },
      ]
    },
    {
      text: 'Java游戏开发',
      link: '/Java/'
    },
    {
      text: 'Go',
      link: '/Go/'
    },
    {
      text: '数据分析',
      items: [{
        text: 'python',
        link: '/Python/'
      },
      {
        text: 'Matlab',
        link: '/MATLAB/'
      }
      ]
    },
    {
      text: '网络',
      link: '/Network/'
    }

    ], //顶部导航栏
    sidebar: [{
      title: 'HTML',
      collection: false,
      children: [
        '/HTML/',
      ]
    },
    {
      title: 'CSS',
      collection: false,
      children: [
        '/CSS/',
        '/CSS/Grid.md'
      ]
    },
    {
      title: 'JavaScript',
      collection: false,
      children: [
        '/JavaScript/'
      ]
    },
    {
      title: 'Vue',
      collection: false,
      children: [
        '/Vue/',
      ]
    },
    {
      title: 'React',
      collection: false,
      children: [
        '/React/',
      ]
    },
    {
      title: 'C',
      collection: false,
      children: [
        '/C/',
      ]
    },
    {
      title: 'C++ STL',
      collection: false,
      children: [
        '/STL/',
      ]
    },
    {
      title: 'Java游戏开发',
      collection: false,
      children: [
        '/Java/',
      ]
    },
    {
      title: 'Go',
      collection: false,
      children: [
        '/Go/',
      ]
    },
    {
      title: 'Web Security',
      collection: false,
      children: [
        '/WebS/',
      ]
    },
    {
      title: 'Python',
      collection: false,
      children: [
        '/Python/',
      ]
    },
    {
      title: 'Matlab',
      collection: false,
      children: [
        '/MATLAB/',
      ]
    },
    {
      title: '网络',
      collection: false,
      children: [
        '/Network/'
      ],
    }
    ], //左侧导航栏
    lastUpdated: true,
    lastUpdated: '最后更新时间',


  }

}