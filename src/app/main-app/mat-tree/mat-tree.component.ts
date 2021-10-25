import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ApiService } from '../services/api.service';
import { categoriesHelper } from '../../models/categories.model';
import { Router } from '@angular/router';

const TREE_DATA: categoriesHelper[] = [
  // {
  //   name: 'Fruit',
  //   children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  // },
  // {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
  //     },
  //     {
  //       name: 'Orange',
  //       children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
  //     },
  //   ],
  // },
  // {
  //   name: 'Fruit',
  //   children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  // },
  // {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
  //     },
  //     {
  //       name: 'Orange',
  //       children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
  //     },
  //   ],
  // },
  // {
  //   name: 'Fruit',
  //   children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  // },
  // {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
  //     },
  //     {
  //       name: 'Orange',
  //       children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
  //     },
  //   ],
  // },
];

interface MicrobeNode {
  expandable: boolean;
  id: number;
  name: string;
  level: number;
}

@Component({
  selector: 'app-mat-tree',
  templateUrl: './mat-tree.component.html',
  styleUrls: ['./mat-tree.component.scss'],
})
export class MatTreeComponent implements OnInit {
  private _transformer = (node: categoriesHelper, level: number) => {
    return {
      expandable: !!node.sub_categories && node.sub_categories.length > 0,
      id: node.id,
      name: node.title,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<MicrobeNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.sub_categories
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private apiService: ApiService, private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: MicrobeNode) => node.expandable;

  ngOnInit(): void {
    this.apiService.getMicrobeCategories().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  onCategory(node: MicrobeNode) {
    this.router.navigate(['/browse', 'type', node.id], {
      queryParams: { parent: node.expandable },
    });
  }
}
