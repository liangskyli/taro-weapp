import Taro from '@tarojs/taro';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { Canvas } from '@tarojs/components';
import type { ChartParams } from '@antv/f2/types/Chart';
import F2 from '@antv/f2/es/index-all';

//const F2 = require('@antv/f2/lib/index'); // 引入 F2
//require('@antv/f2/lib/interaction/pie-select'); // 引入饼图选中交互

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () {};
  }
  return e;
}

function randomStr(long) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const maxPos = chars.length;
  var string = '';
  for (var i = 0; i < long; i++) {
    string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return string;
}

type IF2 = typeof F2;

export type F2CanvasProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  onInit: (F2: IF2, config: ChartParams) => F2.Chart<F2.DataRecord>;
};

const F2Canvas = (props: F2CanvasProps) => {
  const { id = 'f2-canvas-' + randomStr(16), className, onInit, style } = props;

  const [canvasEl, setCanvasEl] = useState<HTMLElement>();
  const [haveQueryResult, setHaveQueryResult] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query
        .select('#' + id)
        .fields({
          node: true,
          size: true,
        })
        .exec((res) => {
          if (res[0] === null) {
            setHaveQueryResult(!haveQueryResult);
            return;
          }
          const { node, width, height } = res[0];
          const context = node.getContext('2d');
          const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
          // 高清设置
          node.width = width * pixelRatio;
          node.height = height * pixelRatio;

          const config = { context, width, height, pixelRatio };
          const chart = onInit(F2, config);
          if (chart) {
            setCanvasEl(chart.get('el'));
          }
        });
    }, 100);
  }, [haveQueryResult]);

  const touchStart = (e) => {
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e));
    }
  };

  const touchMove = (e) => {
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e));
    }
  };

  const touchEnd = (e) => {
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e));
    }
  };

  return (
    <Canvas
      id={id}
      className={className}
      style={style}
      type="2d"
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
    />
  );
};

export default F2Canvas;
