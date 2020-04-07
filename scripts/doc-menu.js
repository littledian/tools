const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../pages');

const sortRules = ['install'];

function generateMenu(dir) {
  const subs = fs.readdirSync(path.join(root, dir));
  return subs
    .filter((s) => !/^index\.\w+$/.test(s))
    .map((s) => {
      const tmp = path.join(root, dir, s);
      const stat = fs.statSync(tmp);
      if (stat.isFile()) {
        const label = s.replace(/.\w+$/, '');
        return {
          label,
          link: `${dir}/${label}`
        };
      } else if (stat.isDirectory()) {
        return {
          label: s,
          link: `${dir}/${s}`,
          children: generateMenu(`${dir}/${s}`)
        };
      }
      return [];
    })
    .sort((a, b) => {
      return sortRules.indexOf(a.label) < sortRules.indexOf(b.label);
    });
}

function generateMenuComp(menu, indent) {
  let s;
  if (menu.children && menu.children.length) {
    s = `<SubMenu key="${menu.link}" title={t('menus.${menu.label}')}>
${menu.children.map((sub) => generateMenuComp(sub, '  ')).join('\r')}
</SubMenu>`;
  } else {
    s = `<Item key="${menu.link}">
  <Link href="${menu.link}">
    <a>{t('menus.${menu.label}')}</a>
  </Link>
</Item>`;
  }
  return s
    .split('\r')
    .map((l) => indent + l)
    .join('\r');
}

const menus = generateMenu('/docs');

const s = `import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useLang } from '@/utils/i18n';

export interface MenusProps {
  selectedKeys: string[];
  defaultOpenKeys: string[]
}

const { SubMenu, Item } = Menu;

export default (props: MenusProps) => {
  const t = useLang();

  return (
    <Menu mode="inline" {...props}>
${menus.map((menu) => generateMenuComp(menu, '    ')).join('\n')}
    </Menu>
  );
}

`;

const targetDir = path.join(__dirname, '../components/DocMenus.tsx');
fs.writeFileSync(targetDir, s, 'utf8');
