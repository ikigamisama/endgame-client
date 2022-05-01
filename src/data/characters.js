const Characters = [
  {
    name: 'x',
    vision: 'x',
    image: require('../assets/images/characters/zz.webp'),
    picked: false,
    banned: false,
    flash: false
  },
  {
    name: 'Albedo',
    vision: 'Geo',
    image: require('../assets/images/characters/albedo.webp'),
    thumbnail: require('../assets/images/thumbnail/albedo_thumb.webp'),
    picked: new Audio(require('../assets/voice/albedo_p.wav')),
    banned: new Audio(require('../assets/voice/albedo_b.wav')),
    flash: require('../assets/images/flash/Albedo.webp')
  },
  {
    name: 'Aloy',
    vision: 'Cryo',
    image: require('../assets/images/characters/aloy.webp'),
    thumbnail: require('../assets/images/thumbnail/aloy_thumb.webp'),
    picked: new Audio(require('../assets/voice/aloy_p.wav')),
    banned: new Audio(require('../assets/voice/aloy_b.wav')),
    flash: require('../assets/images/flash/Aloy.webp')
  },
  {
    name: 'Amber',
    vision: 'Pyro',
    image: require('../assets/images/characters/amber.webp'),
    thumbnail: require('../assets/images/thumbnail/amber_thumb.webp'),
    picked: new Audio(require('../assets/voice/amber_p.wav')),
    banned: new Audio(require('../assets/voice/amber_b.wav')),
    flash: require('../assets/images/flash/Amber.webp')
  },
  {
    name: 'Arataki Itto',
    vision: 'Geo',
    image: require('../assets/images/characters/arataki-itto.webp'),
    thumbnail: require('../assets/images/thumbnail/arataki-itto_thumb.webp'),
    picked: new Audio(require('../assets/voice/itto_p.wav')),
    banned: new Audio(require('../assets/voice/itto_b.wav')),
    flash: require('../assets/images/flash/Itto.webp')
  },
  {
    name: 'Barbara',
    vision: 'Hydro',
    image: require('../assets/images/characters/barbara.webp'),
    thumbnail: require('../assets/images/thumbnail/barbara_thumb.webp'),
    picked: new Audio(require('../assets/voice/barbara_p.wav')),
    banned: new Audio(require('../assets/voice/barbara_b.wav')),
    flash: require('../assets/images/flash/Barbara.webp')
  },
  {
    name: 'Beidou',
    vision: 'Electro',
    image: require('../assets/images/characters/beidou.webp'),
    thumbnail: require('../assets/images/thumbnail/beidou_thumb.webp'),
    picked: new Audio(require('../assets/voice/beidou_p.wav')),
    banned: new Audio(require('../assets/voice/beidou_b.wav')),
    flash: require('../assets/images/flash/Beidou.webp')
  },
  {
    name: 'Bennett',
    vision: 'Pyro',
    image: require('../assets/images/characters/bennett.webp'),
    thumbnail: require('../assets/images/thumbnail/bennett_thumb.webp'),
    picked: new Audio(require('../assets/voice/bennett_p.wav')),
    banned: new Audio(require('../assets/voice/bennett_b.wav')),
    flash: require('../assets/images/flash/Bennett.webp')
  },
  {
    name: 'Chongyun',
    vision: 'Cryo',
    image: require('../assets/images/characters/chongyun.webp'),
    thumbnail: require('../assets/images/thumbnail/chongyun_thumb.webp'),
    picked: new Audio(require('../assets/voice/chongyun_p.wav')),
    banned: new Audio(require('../assets/voice/chongyun_b.wav')),
    flash: require('../assets/images/flash/Chongyun.webp')
  },
  {
    name: 'Diluc',
    vision: 'Pyro',
    image: require('../assets/images/characters/diluc.webp'),
    thumbnail: require('../assets/images/thumbnail/diluc_thumb.webp'),
    picked: new Audio(require('../assets/voice/diluc_p.wav')),
    banned: new Audio(require('../assets/voice/diluc_b.wav')),
    flash: require('../assets/images/flash/Diluc.webp')
  },
  {
    name: 'Diona',
    vision: 'Cryo',
    image: require('../assets/images/characters/diona.webp'),
    thumbnail: require('../assets/images/thumbnail/diona_thumb.webp'),
    picked: new Audio(require('../assets/voice/diona_p.wav')),
    banned: new Audio(require('../assets/voice/diona_b.wav')),
    flash: require('../assets/images/flash/Diona.webp')
  },
  {
    name: 'Eula',
    vision: 'Cryo',
    image: require('../assets/images/characters/eula.webp'),
    thumbnail: require('../assets/images/thumbnail/eula_thumb.webp'),
    picked: new Audio(require('../assets/voice/eula_p.wav')),
    banned: new Audio(require('../assets/voice/eula_b.wav')),
    flash: require('../assets/images/flash/Eula.webp')
  },
  {
    name: 'Fischl',
    vision: 'Electro',
    image: require('../assets/images/characters/fischl.webp'),
    thumbnail: require('../assets/images/thumbnail/fischl_thumb.webp'),
    picked: new Audio(require('../assets/voice/fischl_p.wav')),
    banned: new Audio(require('../assets/voice/fischl_b.wav')),
    flash: require('../assets/images/flash/Fischl.webp')
  },
  {
    name: 'Ganyu',
    vision: 'Cryo',
    image: require('../assets/images/characters/ganyu.webp'),
    thumbnail: require('../assets/images/thumbnail/ganyu_thumb.webp'),
    picked: new Audio(require('../assets/voice/ganyu_p.wav')),
    banned: new Audio(require('../assets/voice/ganyu_b.wav')),
    flash: require('../assets/images/flash/Ganyu.webp')
  },
  {
    name: 'Gorou',
    vision: 'Geo',
    image: require('../assets/images/characters/gorou.webp'),
    thumbnail: require('../assets/images/thumbnail/gorou_thumb.webp'),
    picked: new Audio(require('../assets/voice/gorou_p.wav')),
    banned: new Audio(require('../assets/voice/gorou_b.wav')),
    flash: require('../assets/images/flash/Gorou.webp')
  },
  {
    name: 'Hu Tao',
    vision: 'Pyro',
    image: require('../assets/images/characters/hu-tao.webp'),
    thumbnail: require('../assets/images/thumbnail/hu-tao_thumb.webp'),
    picked: new Audio(require('../assets/voice/hutao_p.wav')),
    banned: new Audio(require('../assets/voice/hutao_b.wav')),
    flash: require('../assets/images/flash/Hu tao.webp')
  },
  {
    name: 'Jean',
    vision: 'Anemo',
    image: require('../assets/images/characters/jean.webp'),
    thumbnail: require('../assets/images/thumbnail/jean_thumb.webp'),
    picked: new Audio(require('../assets/voice/jean_p.wav')),
    banned: new Audio(require('../assets/voice/jean_b.wav')),
    flash: require('../assets/images/flash/Jean.webp')
  },
  {
    name: 'Kaedahara Kazuha',
    vision: 'Anemo',
    image: require('../assets/images/characters/kaedahara-kazuha.webp'),
    thumbnail: require('../assets/images/thumbnail/kaedahara-kazuha_thumb.webp'),
    picked: new Audio(require('../assets/voice/kazuha_p.wav')),
    banned: new Audio(require('../assets/voice/kazuha_b.wav')),
    flash: require('../assets/images/flash/Kazuha.webp')
  },
  {
    name: 'Kaeya',
    vision: 'Cryo',
    image: require('../assets/images/characters/kaeya.webp'),
    thumbnail: require('../assets/images/thumbnail/kaeya_thumb.webp'),
    picked: new Audio(require('../assets/voice/kaeya_p.wav')),
    banned: new Audio(require('../assets/voice/kaeya_b.wav')),
    flash: require('../assets/images/flash/Kaeya.webp')
  },
  {
    name: 'Kamisato Ayaka',
    vision: 'Cryo',
    image: require('../assets/images/characters/kamisato-ayaka.webp'),
    thumbnail: require('../assets/images/thumbnail/kamisato-ayaka_thumb.webp'),
    picked: new Audio(require('../assets/voice/ayaka_p.wav')),
    banned: new Audio(require('../assets/voice/ayaka_b.wav')),
    flash: require('../assets/images/flash/Ayaka.webp')
  },
  {
    name: 'Kamisato Ayato',
    vision: 'Hydro',
    image: require('../assets/images/characters/kamisato-ayato.webp'),
    thumbnail: require('../assets/images/thumbnail/kamisato-ayato_thumb.webp'),
    picked: new Audio(require('../assets/voice/ayato_p.wav')),
    banned: new Audio(require('../assets/voice/ayato_b.wav')),
    flash: require('../assets/images/flash/Ayato.webp')
  },
  {
    name: 'Keqing',
    vision: 'Electro',
    image: require('../assets/images/characters/keqing.webp'),
    thumbnail: require('../assets/images/thumbnail/keqing_thumb.webp'),
    picked: new Audio(require('../assets/voice/keqing_p.wav')),
    banned: new Audio(require('../assets/voice/keqing_b.wav')),
    flash: require('../assets/images/flash/Keqing.webp')
  },
  {
    name: 'Klee',
    vision: 'Pyro',
    image: require('../assets/images/characters/klee.webp'),
    thumbnail: require('../assets/images/thumbnail/klee_thumb.webp'),
    picked: new Audio(require('../assets/voice/klee_p.wav')),
    banned: new Audio(require('../assets/voice/klee_b.wav')),
    flash: require('../assets/images/flash/Klee.webp')
  },
  {
    name: 'Kujou Sara',
    vision: 'Electro',
    image: require('../assets/images/characters/kujou-sara.webp'),
    thumbnail: require('../assets/images/thumbnail/kujou-sara_thumb.webp'),
    picked: new Audio(require('../assets/voice/sara_p.wav')),
    banned: new Audio(require('../assets/voice/sara_b.wav')),
    flash: require('../assets/images/flash/Sara.webp')
  },
  {
    name: 'Lisa',
    vision: 'Electro',
    image: require('../assets/images/characters/lisa.webp'),
    thumbnail: require('../assets/images/thumbnail/lisa_thumb.webp'),
    picked: new Audio(require('../assets/voice/lisa_p.wav')),
    banned: new Audio(require('../assets/voice/lisa_b.wav')),
    flash: require('../assets/images/flash/Lisa.webp')
  },
  {
    name: 'Mona',
    vision: 'Hydro',
    image: require('../assets/images/characters/mona.webp'),
    thumbnail: require('../assets/images/thumbnail/mona_thumb.webp'),
    picked: new Audio(require('../assets/voice/mona_p.wav')),
    banned: new Audio(require('../assets/voice/mona_b.wav')),
    flash: require('../assets/images/flash/Mona.webp')
  },
  {
    name: 'Ningguang',
    vision: 'Geo',
    image: require('../assets/images/characters/ningguang.webp'),
    thumbnail: require('../assets/images/thumbnail/ningguang_thumb.webp'),
    picked: new Audio(require('../assets/voice/ningguang_p.wav')),
    banned: new Audio(require('../assets/voice/ningguang_b.wav')),
    flash: require('../assets/images/flash/Ningguang.webp')
  },
  {
    name: 'Noelle',
    vision: 'Geo',
    image: require('../assets/images/characters/noelle.webp'),
    thumbnail: require('../assets/images/thumbnail/noelle_thumb.webp'),
    picked: new Audio(require('../assets/voice/noelle_p.wav')),
    banned: new Audio(require('../assets/voice/noelle_b.wav')),
    flash: require('../assets/images/flash/Noelle.webp')
  },
  {
    name: 'Qiqi',
    vision: 'Cryo',
    image: require('../assets/images/characters/qiqi.webp'),
    thumbnail: require('../assets/images/thumbnail/qiqi_thumb.webp'),
    picked: new Audio(require('../assets/voice/qiqi_p.wav')),
    banned: new Audio(require('../assets/voice/qiqi_b.wav')),
    flash: require('../assets/images/flash/Qiqi.webp')
  },
  {
    name: 'Raiden Shogun',
    vision: 'Electro',
    image: require('../assets/images/characters/raiden-shogun.webp'),
    thumbnail: require('../assets/images/thumbnail/raiden_thumb.webp'),
    picked: new Audio(require('../assets/voice/raiden_p.wav')),
    banned: new Audio(require('../assets/voice/raiden_b.wav')),
    flash: require('../assets/images/flash/Raiden.webp')
  },
  {
    name: 'Razor',
    vision: 'Electro',
    image: require('../assets/images/characters/razor.webp'),
    thumbnail: require('../assets/images/thumbnail/razor_thumb.webp'),
    picked: new Audio(require('../assets/voice/razor_p.wav')),
    banned: new Audio(require('../assets/voice/razor_b.wav')),
    flash: require('../assets/images/flash/Razor.webp')
  },
  {
    name: 'Rosaria',
    vision: 'Cryo',
    image: require('../assets/images/characters/rosaria.webp'),
    thumbnail: require('../assets/images/thumbnail/rosaria_thumb.webp'),
    picked: new Audio(require('../assets/voice/rosaria_p.wav')),
    banned: new Audio(require('../assets/voice/rosaria_b.wav')),
    flash: require('../assets/images/flash/Rosaria.webp')
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: 'Hydro',
    image: require('../assets/images/characters/sangonomiya-kokomi.webp'),
    thumbnail: require('../assets/images/thumbnail/sangonomiya-kokomi_thumb.webp'),
    picked: new Audio(require('../assets/voice/kokomi_p.wav')),
    banned: new Audio(require('../assets/voice/kokomi_b.wav')),
    flash: require('../assets/images/flash/Kokomi.webp')
  },
  {
    name: 'Sayu',
    vision: 'Anemo',
    image: require('../assets/images/characters/sayu.webp'),
    thumbnail: require('../assets/images/thumbnail/sayu_thumb.webp'),
    picked: new Audio(require('../assets/voice/sayu_p.wav')),
    banned: new Audio(require('../assets/voice/sayu_b.wav')),
    flash: require('../assets/images/flash/Sayu.webp')
  },
  {
    name: 'Shenhe',
    vision: 'Cryo',
    image: require('../assets/images/characters/shenhe.webp'),
    thumbnail: require('../assets/images/thumbnail/shenhe_thumb.webp'),
    picked: new Audio(require('../assets/voice/shenhe_p.wav')),
    banned: new Audio(require('../assets/voice/shenhe_b.wav')),
    flash: require('../assets/images/flash/Shenhe.webp')
  },
  {
    name: 'Sucrose',
    vision: 'Anemo',
    image: require('../assets/images/characters/sucrose.webp'),
    thumbnail: require('../assets/images/thumbnail/sucrose_thumb.webp'),
    picked: new Audio(require('../assets/voice/sucrose_p.wav')),
    banned: new Audio(require('../assets/voice/sucrose_b.wav')),
    flash: require('../assets/images/flash/Sucrose.webp')
  },
  {
    name: 'Tartaglia',
    vision: 'Hydro',
    image: require('../assets/images/characters/tartaglia.webp'),
    thumbnail: require('../assets/images/thumbnail/tartaglia_thumb.webp'),
    picked: new Audio(require('../assets/voice/childe_p.wav')),
    banned: new Audio(require('../assets/voice/childe_b.wav')),
    flash: require('../assets/images/flash/Childe.webp')
  },
  {
    name: 'Thoma',
    vision: 'Pyro',
    image: require('../assets/images/characters/thoma.webp'),
    thumbnail: require('../assets/images/thumbnail/thoma_thumb.webp'),
    picked: new Audio(require('../assets/voice/thoma_p.wav')),
    banned: new Audio(require('../assets/voice/thoma_b.wav')),
    flash: require('../assets/images/flash/Thoma.webp')
  },
  // {
  //   name: 'Traveler',
  //   vision: 'Unknown',
  //   image: require('../assets/images/characters/traveler.webp')
  // },
  {
    name: 'Venti',
    vision: 'Anemo',
    image: require('../assets/images/characters/venti.webp'),
    thumbnail: require('../assets/images/thumbnail/venti_thumb.webp'),
    picked: new Audio(require('../assets/voice/venti_p.wav')),
    banned: new Audio(require('../assets/voice/venti_b.wav')),
    flash: require('../assets/images/flash/Venti.webp')
  },
  {
    name: 'Xiangling',
    vision: 'Pyro',
    image: require('../assets/images/characters/xiangling.webp'),
    thumbnail: require('../assets/images/thumbnail/xiangling_thumb.webp'),
    picked: new Audio(require('../assets/voice/xiangling_p.wav')),
    banned: new Audio(require('../assets/voice/xiangling_b.wav')),
    flash: require('../assets/images/flash/Xiangling.webp')
  },
  {
    name: 'Xiao',
    vision: 'Anemo',
    image: require('../assets/images/characters/xiao.webp'),
    thumbnail: require('../assets/images/thumbnail/xiao_thumb.webp'),
    picked: new Audio(require('../assets/voice/xiao_p.wav')),
    banned: new Audio(require('../assets/voice/xiao_b.wav')),
    flash: require('../assets/images/flash/Xiao.webp')
  },
  {
    name: 'Xingqiu',
    vision: 'Hydro',
    image: require('../assets/images/characters/xingqiu.webp'),
    thumbnail: require('../assets/images/thumbnail/xingqiu_thumb.webp'),
    picked: new Audio(require('../assets/voice/xingqiu_p.wav')),
    banned: new Audio(require('../assets/voice/xingqiu_b.wav')),
    flash: require('../assets/images/flash/Xingqiu.webp')
  },
  {
    name: 'Xinyan',
    vision: 'Pyro',
    image: require('../assets/images/characters/xinyan.webp'),
    thumbnail: require('../assets/images/thumbnail/xinyan_thumb.webp'),
    picked: new Audio(require('../assets/voice/xinyan_p.wav')),
    banned: new Audio(require('../assets/voice/xinyan_b.wav')),
    flash: require('../assets/images/flash/Xinyan.webp')
  },
  {
    name: 'Yae Miko',
    vision: 'Electro',
    image: require('../assets/images/characters/yae-miko.webp'),
    thumbnail: require('../assets/images/thumbnail/yae-miko_thumb.webp'),
    picked: new Audio(require('../assets/voice/yae_p.wav')),
    banned: new Audio(require('../assets/voice/yae_b.wav')),
    flash: require('../assets/images/flash/Yaemiko.webp')
  },
  {
    name: 'Yanfei',
    vision: 'Pyro',
    image: require('../assets/images/characters/yanfei.webp'),
    thumbnail: require('../assets/images/thumbnail/yanfei_thumb.webp'),
    picked: new Audio(require('../assets/voice/yanfei_p.wav')),
    banned: new Audio(require('../assets/voice/yanfei_b.wav')),
    flash: require('../assets/images/flash/Yanfei.webp')
  },
  {
    name: 'Yoimiya',
    vision: 'Pyro',
    image: require('../assets/images/characters/yoimiya.webp'),
    thumbnail: require('../assets/images/thumbnail/yoimiya_thumb.webp'),
    picked: new Audio(require('../assets/voice/yoimiya_p.wav')),
    banned: new Audio(require('../assets/voice/yoimiya_b.wav')),
    flash: require('../assets/images/flash/Yoimiya.webp')
  },
  {
    name: 'Yunjin',
    vision: 'Geo',
    image: require('../assets/images/characters/yunjin.webp'),
    thumbnail: require('../assets/images/thumbnail/yunjin_thumb.webp'),
    picked: new Audio(require('../assets/voice/yunjin_p.wav')),
    banned: new Audio(require('../assets/voice/yunjin_b.wav')),
    flash: require('../assets/images/flash/Yun jin.webp')
  },
  {
    name: 'Zhongli',
    vision: 'Geo',
    image: require('../assets/images/characters/zhongli.webp'),
    thumbnail: require('../assets/images/thumbnail/zhongli_thumb.webp'),
    picked: new Audio(require('../assets/voice/zhongli_p.wav')),
    banned: new Audio(require('../assets/voice/zhongli_b.wav')),
    flash: require('../assets/images/flash/Zhongli.webp')
  }
]

export default Characters
